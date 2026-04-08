param(
  [string]$EvidencePath = "reports/data-quality.json",
  [int]$MaxCritical = 0,
  [int]$MaxHigh = 0
)

Write-Host "== Data Quality Gate =="
Write-Host "EvidencePath: $EvidencePath"

if (!(Test-Path $EvidencePath)) {
  Write-Host "⚠️ Evidência não encontrada. Gate será GO_WITH_MITIGATION (sem dados)."
  Write-Host "##vso[task.setvariable variable=gateDecision]GO_WITH_MITIGATION"
  Write-Host "##vso[task.setvariable variable=gateReason]EVIDENCE_MISSING"
  exit 0
}

$evidence = Get-Content $EvidencePath -Raw | ConvertFrom-Json

$critical = 0
$high = 0
$medium = 0
$low = 0

foreach ($issue in $evidence.issues) {
  switch ($issue.severity) {
    "CRITICAL" { $critical++ }
    "HIGH"     { $high++ }
    "MEDIUM"   { $medium++ }
    "LOW"      { $low++ }
  }
}

Write-Host "Counts => CRITICAL=$critical, HIGH=$high, MEDIUM=$medium, LOW=$low"

$decision = "GO"
$reason = "OK"

if ($critical -gt $MaxCritical) {
  $decision = "NO_GO"
  $reason = "CRITICAL_ISSUES"
} elseif ($high -gt $MaxHigh) {
  $decision = "NO_GO"
  $reason = "HIGH_ISSUES"
} elseif (($medium + $low) -gt 0) {
  $decision = "GO_WITH_MITIGATION"
  $reason = "NON_BLOCKING_ISSUES"
}

Write-Host "Decision => $decision ($reason)"

Write-Host "##vso[task.setvariable variable=gateDecision]$decision"
Write-Host "##vso[task.setvariable variable=gateReason]$reason"
Write-Host "##vso[task.setvariable variable=gateCritical]$critical"
Write-Host "##vso[task.setvariable variable=gateHigh]$high"
Write-Host "##vso[task.setvariable variable=gateMedium]$medium"
Write-Host "##vso[task.setvariable variable=gateLow]$low"

New-Item -ItemType Directory -Force "reports" | Out-Null
$summaryPath = "reports/data-quality-summary.md"

@"
# Data Quality Gate — Resultado

**Decision:** $decision  
**Reason:** $reason  

## Contagem de issues
- CRITICAL: $critical  
- HIGH: $high  
- MEDIUM: $medium  
- LOW: $low  

## Observação
Gate baseado em evidência JSON. Em cenário real, a evidência pode ser gerada por validações de API/SQL/eventos.
"@ | Out-File $summaryPath -Encoding utf8

if ($decision -eq "NO_GO") {
  Write-Error "NO_GO: bloqueando pipeline por qualidade de dados."
  exit 1
}

exit 0
Feature: Autenticação e Acesso Autorizado (Auth)
  O objetivo é validar o comportamento do sistema de autenticação,
  garantindo login funcional, refresh token e acesso autenticado à rota /auth/me.

  Background:
    Given que o sistema de autenticação esteja disponível
    And que eu possua o endpoint base configurado
    And que exista um usuário válido com username "emilys" e password "emilyspass"

  # --------------------------
  # Cenários Positivos
  # --------------------------

  Scenario: Realizar login com sucesso
    When eu envio POST para "/auth/login" com credenciais válidas
    Then o sistema deve retornar status 200
    And a resposta deve conter um "accessToken"
    And a resposta deve conter um "refreshToken"

  Scenario: Realizar refresh token com sucesso
    Given que eu tenha realizado login previamente
    When eu envio POST para "/auth/refresh" usando o refreshToken válido
    Then o sistema deve retornar status 200
    And deve retornar um novo "accessToken"
    And deve retornar um novo "refreshToken"

  Scenario: Consultar dados autenticados com token válido
    Given que eu tenha um accessToken válido
    When eu envio GET para "/auth/me"
    Then o sistema deve retornar status 200
    And deve retornar os dados completos do usuário autenticado


  # --------------------------
  # Cenários Negativos
  # --------------------------

  Scenario: Tentar login com senha incorreta
    When eu envio POST para "/auth/login" com username "emilys" e password "senhaerrada"
    Then o sistema deve retornar status 401

  Scenario: Tentar login com usuário inexistente
    When eu envio POST para "/auth/login" com username "usuariodefantasia" e uma senha qualquer
    Then o sistema deve retornar status 401

  Scenario: Tentar login com username vazio
    When eu envio POST para "/auth/login" com username "" e password "qualquer"
    Then o sistema deve retornar status 400

  Scenario: Tentar login com password vazio
    When eu envio POST para "/auth/login" com username "emilys" e password ""
    Then o sistema deve retornar status 400

  Scenario: Tentar acessar /auth/me sem token
    When eu envio GET para "/auth/me" sem token
    Then o sistema deve retornar status 401

  Scenario: Tentar acessar /auth/me com token inválido
    When eu envio GET para "/auth/me" usando um token inválido
    Then o sistema deve retornar status 401

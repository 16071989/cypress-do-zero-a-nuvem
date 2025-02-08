
/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia o formulário', function () {
    const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste,'
    cy.get('#firstName').should('be.visible').type('Felipe').should('have.value', 'Felipe')
    cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva')
    cy.get('#email').should('be.visible').type('felipe.silva@teste.com').should('have.value', 'felipe.silva@teste.com')
    cy.get('#phone').should('be.visible').type('11969692424').should('have.value', '11969692424')
    cy.get('#product').select('YouTube').should('be.visible', 'youtube')
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click().should('be.visible')
    cy.get('.success').should('be.visible')
  })
  it('Preenche os campos obrigatórios e envia o formulário com e-mail incorreto', function () {
    cy.get('#firstName').should('be.visible').type('Felipe').should('have.value', 'Felipe')
    cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva')
    cy.get('#email').should('be.visible').type('felipe.silva@teste,com').should('have.value', 'felipe.silva@teste,com')
    cy.get('#phone').should('be.visible').type('11969692424').should('have.value', '11969692424')
    cy.get('#product').select('mentoria').should('be.visible', 'mentoria')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click().should('be.visible')
    cy.get('.error').should('be.visible')
  })
  it('Preenche do campo telefone so aceita numero', function () {
    cy.get('#phone').type('jfhgfjgfghj').should('have.value', '')
  })
  it('Preenche do campos do formulario com campo telefone obrigatorio', function () {
    cy.get('#firstName').should('be.visible').type('Felipe').should('have.value', 'Felipe')
    cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva')
    cy.get('#email').should('be.visible').type('felipe.silva@teste.com').should('have.value', 'felipe.silva@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click().should('be.visible')
    cy.get('.error').should('be.visible')
  })
  it('Preenchimento do formulario e limpa o campo depois', function () {
    cy.get('#firstName').type('Felipe').should('be.visible', 'Felipe').clear().should('have.value', '')
    cy.get('#lastName').type('Silva').should('be.visible', 'Silva').clear().should('have.value', '')
    cy.get('#email').type('felipe.silva@teste.com').should('be.visible', 'felipe.silva@teste.com').clear().should('have.value', '')
    cy.get('#phone').type('11969692424').should('be.visible', '11969692424').clear().should('have.value', '')
  })
  it('Valida que foi exibido menssagem de erro', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('Função de execução de teste', function () {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function ($radio) {
    cy.wrap($radio).check()
    cy.wrap($radio).should("be.visible")
    })
  })
  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function ($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(function ($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('samleFile')
    cy.get('input[type="file"]')
    .selectFile('@samleFile')
    .should(function ($input) {
    expect($input[0].files[0].name).to.equal('example.json')
  })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
})


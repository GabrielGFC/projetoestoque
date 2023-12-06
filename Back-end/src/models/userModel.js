class User {
  constructor(matricula, senha, tipo) {
    this.matricula = matricula;
    this.senha = senha;
    this.tipo = tipo; // Aluno ou Colaborador
  }
}

module.exports = User;

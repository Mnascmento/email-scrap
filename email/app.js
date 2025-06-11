require('dotenv').config();
const nodemailer = require('nodemailer');
const { fetchCourses } = require('../scraper/app.js'); // Importa a função de busca de cursos
const { generateEmailHtml } = require('../scraper/emailTemplate.js');

// Criação do transportador de e-mail com base nas variáveis de ambiente
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar o e-mail
async function sendEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Minha fonte" <${process.env.EMAIL_USER}>`, // Remetente
      to: 'melonascmento@gmail.com', // Lista de destinatários
      subject: 'Novos cursos disponíveis!', // Assunto
      text: 'Veja os cursos gratuitos que separei para você.', // Corpo do e-mail em texto simples
      html: htmlContent, // Corpo do e-mail em HTML
    });

    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

// Dispara o e-mail
sendEmail();

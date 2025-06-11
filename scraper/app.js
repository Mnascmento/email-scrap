const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML
const { generateEmailHtml } = require('./emailTemplate'); // Importa a função de template de email


const url = 'https://www.classcentral.com/search?q=free+technology&lang=portuguese&free=true&subject=cs%2Cdata-science%2Cinfosec%2Cprogramming-and-software-development&level=advanced%2Cbeginner%2Cintermediate&certificate=true';

async function fetchCourses() {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const courseCards = $('.color-charcoal.course-name');
        const courseList = [];

        courseCards.each(function () {
            const title = $(this).text().trim();
            const relativeLink = $(this).attr('href');
            const link = relativeLink ? `https://www.classcentral.com${relativeLink}` : null;

            const courseContainer = $(this).closest('.course-name');
            const platform = courseContainer.next().text().trim() || "Plataforma não informada";
            const description = courseContainer.parent().find('.text-1-lines').text().trim();

            const textoTotal = `${title} ${description}`.toLowerCase();

            const palavrasPortugues = [
                'curso',
                'gratuito',
                'certificado',
                'tecnologia',
                'introdução',
                'básico',
                'avançado',
                'desenvolvimento',
                'dados'
            ];

            const contemPortugues = palavrasPortugues.some(palavra => textoTotal.includes(palavra));

            if (title && link && contemPortugues && courseList.length < 10) {
                courseList.push({
                    title,
                    platform,
                    link,
                    description,
                });
            }
        });

        return courseList;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

(async () => {
    const courseList = await fetchCourses(); 
    const htmlContent = generateEmailHtml(courseList);
    console.log(htmlContent);
})();

module.exports = { fetchCourses }; // Exporta a função para uso no email
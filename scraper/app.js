const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML

const url = 'https://www.classcentral.com/search?q=free+technology';

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

            if (title && link && courseList.length < 5) {
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

module.exports = { fetchCourses };

// Executa a função
fetchCourses();

// emailTemplate.js

function generateEmailHtml(courseList) {
    const styles = `
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .course-card {
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 12px;
            }
            .course-title {
                font-size: 18px;
                font-weight: bold;
                color: #2c3e50;
                text-decoration: none;
            }
            .course-platform {
                font-size: 14px;
                color: #777;
                margin-top: 4px;
            }
            .course-description {
                margin-top: 8px;
                font-size: 15px;
            }
        </style>
    `;

    const courseItems = courseList.map(course => `
        <div class="course-card">
            <a href="${course.link}" class="course-title" target="_blank">${course.title}</a>
            <div class="course-platform">Plataforma: ${course.platform}</div>
            <div class="course-description">${course.description || 'Sem descrição disponível.'}</div>
        </div>
    `).join('');

    return `
        <html>
            <head>${styles}</head>
            <body>
                <h2>Cursos Gratuitos em Tecnologia</h2>
                ${courseItems}
            </body>
        </html>
    `;
}

module.exports = { generateEmailHtml };


const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Solo permitir peticiones POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return {
      statusCode: 500,
      body: 'Error: Variables de entorno de Telegram no configuradas.',
    };
  }

  try {
    const data = JSON.parse(event.body);

    const now = new Date();
    const timestamp = new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'America/Bogota'
    }).format(now);

    // Formatear el mensaje para Telegram
    const message = `
      📢 **¡Nuevo Pedido!** 📢
      -----------------------------------
      🗓️ **Fecha:** ${timestamp}
      -----------------------------------
      📦 **Producto:** ${data.productTitle}
      -----------------------------------
      👤 **Cliente:** ${data.nombres} ${data.apellidos}
      📞 **Teléfono:** ${data.telefono}
      -----------------------------------
      📍 **Dirección de Envío:**
      - **Departamento:** ${data.departamento}
      - **Ciudad:** ${data.ciudad}
      - **Dirección:** ${data.direccion}
      -----------------------------------
      💰 **Total:** $75.000 (Pago Contra Entrega)
    `;

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Error de la API de Telegram:', errorBody);
      return {
        statusCode: response.status,
        body: `Error al enviar a Telegram: ${errorBody.description}`,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pedido enviado a Telegram con éxito' }),
    };

  } catch (error) {
    console.error('Error en la función:', error);
    return {
      statusCode: 500,
      body: `Error interno del servidor: ${error.message}`,
    };
  }
};

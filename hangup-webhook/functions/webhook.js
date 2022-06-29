exports.handler = async function (context, event, callback) {
  console.log(`🐞 Webhook called.`);
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Got parameters
    const taskSid = event.taskSid || '';
    console.log(`taskSid: ${taskSid}`);
    if (!taskSid) throw new Error('Parameter error.');

    response.appendHeader('Content-Type', 'application/json');
    response.setBody({});
    callback(null, response);
  } catch (err) {
    console.error(err.message ? err.message : err);
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody(err);
    callback(null, response);
  }
};

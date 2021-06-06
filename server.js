const express = require('express');
const app = express();

app.use(express.static('./dist/dgsin-contacts-front-ng'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/dgsin-contacts-front/'}
);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server ready");
}).on("error", (e) => {
  console.error("Server NOT ready!");
});

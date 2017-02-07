module.exports = (req, res) => (data) => {
  res.status(500);
  console.log(data);
  res.send({
    status: 'error',
    message: data,
  });
};

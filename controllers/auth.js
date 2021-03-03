module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('http://localhost:4200');
} 

module.exports.currentUser = (req, res) => {
  if(req.user) {
    const { _id, email, fullName } = req.user
    const currentUser = { _id, email, fullName }
    return res.send(currentUser);
  }
  
  res.status(401).send({ error: 'Unauthorize' })
} 



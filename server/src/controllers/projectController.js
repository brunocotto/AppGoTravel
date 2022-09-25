

exports.teste = async (req, res) => {
    //como o user id foi usado no req do middleware
    //req.userId = decoded.id; return next()
    // agora posso obtê-lo aqui! diretamente do token..
    res.send({ ok: true, user: req.userId });
}
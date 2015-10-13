// GET /autor
exports.list = function(req, res) {
    res.render('autores/list', {autores: [
            'Alberto Sierra',
            'Pedro Pérez'
            ]
        }
    );
};


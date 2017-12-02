const express = require("express");

module.exports = {
    createPayment: function(req, res) {
        console.log(req.body);
        res.send();
    }
}
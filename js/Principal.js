function inicioPadrao() {
    jv = new JogoDaVelha();
    ia = new IA(jv, OUTRO_SIMBOLO);
    g = new Graficos(jv, ia);
    g.atualizar();
}

inicioPadrao();

pv = $(passarVez);
pv.on("click", function() {
    ia = new IA(jv, SIMBOLO_INICIAL);
    ia.fazerJogada();
    g = new Graficos(jv, ia);
    g.atualizar();
    $(this).attr("disabled", true);
});

r = $(reiniciar);
r.on("click", function() {
    inicioPadrao();
    $(passarVez).attr("disabled", false);
});

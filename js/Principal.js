jv = new JogoDaVelha();
jv.fazerJogada("c11");
jv.fazerJogada("c10");
jv.fazerJogada("c01");
jv.fazerJogada("c00");
jv.fazerJogada("c12");
jv.fazerJogada("c02");

g = new Graficos(jv);
g.atualizar();

ia = new IA(jv, "x");
ia.gerarArvoreJogos();
//ia.mostrarJogosEmProfundidade();
ia.gerarArvoreMinimax();
//ia.mostrarNohsMinimaxEmProfundidade();

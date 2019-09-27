jv = new JogoDaVelha();
jv.fazerJogada("c00");
jv.fazerJogada("c01");
jv.fazerJogada("c02");
jv.fazerJogada("c10");
jv.fazerJogada("c11");
jv.fazerJogada("c12");

g = new Graficos(jv);

ia = new IA(jv, "x");
ia.gerarArvoreJogos();
//ia.mostrarJogosEmProfundidade();
ia.gerarArvoreMinimax();
//ia.mostrarNohsMinimaxEmProfundidade();

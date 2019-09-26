jv = new JogoDaVelha();
jv.imprimirJogo();

g = new Graficos(jv);

ia = new IA(jv);
ia.gerarArvoreDeJogos();

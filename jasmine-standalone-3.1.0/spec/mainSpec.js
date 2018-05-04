/* TO DO - list
*
*   velocidad de respuesta, acierto o fallo,
*
*      Si acierto pregunta en menos de 2 segundos - sumo 2 puntos
*          (0 puntos, pregunta correcta, 1 segundo) -> 2 puntos
*          (1 punto, correcta, 1 segundo) -> 3 puntos
       Si acierto pregunta entre 2 y 10 segundos - sumo 1 punto
          (1 punto, correcta, 5 segundos) -> 2 puntos
       Si acierto y tardo mas de 10 segundos - 0 puntos
          (1 punto, correcta, 11 segundos) -> 1 punto
      Si fallo antes de 10 segundos - resto 1 punto
          (1 punto, !correcta, 6 segundos) -> 0 puntos
*      Si fallo pregunta en mas de 10 segundos - resto 2 puntos
          (2 puntos, !correcta, 12 segundos) -> 0 puntos
       Si en 20 segundos no has respondido , pasa a siguiente pregunta y pierdes 3 punto
          (5 puntos, !correcta, 30 segundos) -> 2 puntos
*      No se puede pasar sin responder
*
*
* */


describe('calculo de marcador', function () {
  function recalcularMarcador(puntos, esCorrecta, tiempo) {
    if (esCorrecta && tiempo <= 2) {
      return puntos + 2;
    } else if (esCorrecta && tiempo <= 10) {
      return puntos + 1
    } else if (esCorrecta && tiempo > 10) {
      return puntos + 0
    } else if (!esCorrecta && tiempo < 10) {
      return puntos - 1
    } else if (!esCorrecta && tiempo > 10 && tiempo < 20) {
      return puntos - 2
    } else if (!esCorrecta && tiempo > 20) {
      return puntos - 3
    }
  }

  it("suma mas puntos si acierta muy rapido", function () {
    expect(recalcularMarcador(0, true, 1)).toBe(2);
    expect(recalcularMarcador(2, true, 1)).toBe(4);
  });


  it("suma menos puntos si acierta lento", function () {
    expect(recalcularMarcador(1, true, 5)).toBe(2);
    expect(recalcularMarcador(1, true, 11)).toBe(1);
  });

  it("resta puntos si no acierta", function () {
    expect(recalcularMarcador(1, false, 9)).toBe(0);
    expect(recalcularMarcador(2, false, 11)).toBe(0);
    expect(recalcularMarcador(5, false, 21)).toBe(2);
  });
});

//REFACTOR WITH SWITCH
describe('calculo de marcador refactor', function () {
  function actualizarMarcador(puntos, esCorrecta, tiempo) {
    switch (true) {
      case (esCorrecta && tiempo <= 2): return puntos + 2;
      case (esCorrecta && tiempo <= 10): return puntos + 1;
      case (esCorrecta && tiempo > 10): return puntos + 0;
      case (!esCorrecta && tiempo < 10): return puntos - 1;
      case (!esCorrecta && tiempo > 10 && tiempo < 20): return puntos - 2;
      case (!esCorrecta && tiempo > 20): return puntos - 3;
    }
  }


  it("suma mas puntos si acierta muy rapido", function () {
    expect(actualizarMarcador(0, true, 1)).toBe(2);
    expect(actualizarMarcador(2, true, 1)).toBe(4);
  });

  it("suma menos puntos si acierta lento", function () {
    expect(actualizarMarcador(1, true, 5)).toBe(2);
    expect(actualizarMarcador(1, true, 11)).toBe(1);
  });

  it("resta puntos si no acierta", function () {
    expect(actualizarMarcador(5, false, 9)).toBe(4);
    expect(actualizarMarcador(2, false, 11)).toBe(0);
    expect(actualizarMarcador(5, false, 21)).toBe(2);
  });

});
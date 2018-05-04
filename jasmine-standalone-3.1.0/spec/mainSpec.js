/* TO DO - list



  Si acierto pregunta en menos de 2 segundos - sumo 2 puntos
    (0 puntos, pregunta correcta, 1 segundo) -> 2 puntos
    (1 punto, correcta, 1 segundo) -> 3 puntos
  Si acierto pregunta entre 2 y 10 segundos - sumo 1 punto
    (1 punto, correcta, 5 segundos) -> 2 puntos
  Si acierto y tardo mas de 10 segundos - 0 puntos
    (1 punto, correcta, 11 segundos) -> 1 punto
  Si fallo antes de 10 segundos - resto 1 punto
    (1 punto, !correcta, 6 segundos) -> 0 puntos
  Si fallo pregunta en mas de 10 segundos - resto 2 puntos
    (2 puntos, !correcta, 12 segundos) -> 0 puntos

// CALCULO SI NO HAY RESPUESTA 
  Si en 20 segundos no has respondido , pasa a siguiente pregunta y pierdes 3 punto, pero el tiempo aquí da igual
    (5 puntos, !correcta, 20 segundos) -> 2 puntos

// RESPUESTA CORRECT O NO CORRECTA
   Respuesta correcta
    question: ¿Cuál es la capital de Portugal?
    options: Lisboa/Moscú/Madrid
    answer: Lisboa
  
  Respuesta incorrecta
    question: ¿Cuál es la capital de Portugal?
    options: Lisboa/Moscú/Madrid
    answer: Moscú

  Respuesta diferentes a las ofrecidad, incorrecta
    question: ¿Cuál es la capital de Portugal?
    options: Lisboa/Moscú/Madrid
    answer: Helsinki
* */

describe('verificación respuesta', function () {
  function perteneceAPregunta(pregunta, respuesta) {
    return (pregunta.id === respuesta.questionId)
  }

  it('muestra si id pregunta corresponte a la respuesta', function () {
    expect(perteneceAPregunta({
      id: 1,
      pregunta: '¿Cuál es la capital de Portugal?',
      opciones: [
        {
          id: 1, respuesta: 'Lisboa'
        },
        {
          id: 2, respuesta: 'Moscú'
        },
        {
          id: 3, respuesta: 'Madrid'
        },
      ],
      respuestaCorrecta: { id: 2 }
    },
      { questionId: 2, id: 2 })
    ).toBeFalsy()


    expect(perteneceAPregunta({
      id: 1,
      pregunta: '¿Cuál es la capital de Portugal?',
      opciones: [
        {
          id: 1, respuesta: 'Lisboa'
        },
        {
          id: 2, respuesta: 'Moscú'
        },
        {
          id: 3, respuesta: 'Madrid'
        },
      ],
      respuestaCorrecta: { id: 2 }
    },
      { questionId: 1, id: 2 })
    ).toBeTruthy()

  });

  it('muestra si pregunta es correcta', function () {
    expect(esCorrecta({
      id: 1,
      pregunta: '¿Cuál es la capital de Portugal?',
      opciones: [
        {
          id: 1, respuesta: 'Lisboa'
        },
        {
          id: 2, respuesta: 'Moscú'
        },
        {
          id: 3, respuesta: 'Madrid'
        },
      ],
      respuestaCorrecta: { id: 2 }
    },
      { questionId: 1, id: 2 })
    ).toBe(true)

  })
});



describe('calculo de marcador', function () {
  function sumarPuntos(puntos, tiempo) {
    if (tiempo <= 2) {
      return puntos + 2;
    } else if (tiempo <= 10) {
      return puntos + 1
    } else if (tiempo > 10) {
      return puntos + 0
    }
  }

  function restarPuntos(puntos, tiempo) {
    if (tiempo < 10) {
      return puntos - 1
    } else if (tiempo > 10 && tiempo < 20) {
      return puntos - 2
    }
  }

  function restarPuntosSiNoRespuesta(puntos) {
    return puntos - 3
  }

  it("suma mas puntos si acierta muy rapido", function () {
    expect(sumarPuntos(0, 1)).toBe(2);
    expect(sumarPuntos(2, 1)).toBe(4);
  });


  it("suma menos puntos si acierta lento", function () {
    expect(sumarPuntos(1, 5)).toBe(2);
    expect(sumarPuntos(1, 11)).toBe(1);
  });

  it("resta puntos si no acierta", function () {
    expect(restarPuntos(1, 9)).toBe(0);
    expect(restarPuntos(2, 11)).toBe(0);
  });

  it("resta puntos si no hay respuesta", function () {
    expect(restarPuntosSiNoRespuesta(5)).toBe(2);
  })
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
(function() {
  var WIN_CUTOFF = 100;

  var state = {
    p1Score: 0,
    p2Score: 0,
    lastRoll: 0,
    isP1Turn: true,
    turnScore: 0
  };

  var updateUi = function() {
    $('.p1Score').text(state.p1Score);
    $('.p2Score').text(state.p2Score);
    $('.lastRoll').text(state.lastRoll);
    $('.currentTurnScore').text(state.turnScore);

    var activePlayer = state.isP1Turn ? $('.p1') : $('.p2');
    activePlayer.addClass('active');

    var inactivePlayer = state.isP1Turn ? $('.p2') : $('.p1');
    inactivePlayer.removeClass('active');
  };

  var deactivateButtons = function() {
    $('.hold, .roll').attr('disabled', true);
  };

  var rollDie = function() {
    return Math.floor(6 * Math.random()) + 1;
  };

  var addTurnScore = function() {
    if (state.isP1Turn) {
      state.p1Score += state.turnScore;
    } else {
      state.p2Score += state.turnScore;
    }
    state.turnScore = 0;
  };

  $('.roll').click(function() {
    state.lastRoll = rollDie();
    if (state.lastRoll === 1) {
      state.turnScore = 0;
      state.isP1Turn = !state.isP1Turn;
    } else {
      state.turnScore += state.lastRoll;

      var baseScore = state.isP1Turn ? state.p1Score : state.p2Score;
      if (baseScore + state.turnScore >= WIN_CUTOFF) {
        addTurnScore();
        deactivateButtons();
      }
    }

    updateUi();
  });


  $('.hold').click(function() {
    addTurnScore();
    state.isP1Turn = !state.isP1Turn;

    updateUi();
  });

  updateUi();

})();

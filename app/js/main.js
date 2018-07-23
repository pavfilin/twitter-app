$(document).ready(function() {

  var getDate = function () {
    var d = new Date(),
      day = d.getDate(),
      hrs = d.getHours(),
      min = d.getMinutes(),
      sec = d.getSeconds(),
      month = d.getMonth(),
      year = d.getFullYear();

    var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

    if (day <= 9) {
      day = "0" + day;
    }

    var actualDay = `${day} ${monthArray[month]} ${year} года ${hrs} часов ${min} минут`;

    return actualDay;
  }

  var countTweets = function () {
    var tweetCounter = $('.tweet-card').length;
    $('#tweetsCounter').text(tweetCounter);
  }

  var wrapURLs = function (text, new_window) {
    var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
    var target = (new_window === true || new_window == null) ? '_blank' : '';

    return text.replace(url_pattern, function (url) {
      var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
      var href = protocol_pattern.test(url) ? url : 'http://' + url;
      return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
    });
  };

  var createTweet = function (date, text) {
    var $tweetBox = $('<div class="card tweet-card">');
    var $tweetDate = $('<div class="tweet-date">').text(date);
    var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>');

    var additionalClassName = '';

    if (text.length < 100) {
        additionalClassName = 'fon-size-large';
    } else if (text.length > 150) {
      additionalClassName = 'font-size-small';
    } else {
      additionalClassName = 'font-size-normal';
    }

    $tweetText.addClass(additionalClassName);
    $tweetBox.append($tweetDate).append($tweetText);
    $('#tweet-list').prepend($tweetBox);

    countTweets();
  }

  var tweetsBase = [
    {
      date: '19 аперля 2018',
      text: 'Создай сайт за 3 дня c помощью http://getbootstrap.com'
    },
    {
      date: '27 октября 2015',
      text: 'Полосатые коты атаковали марс http://getbootstrap.com'
    },
    {
      date: '30 августа 2017',
      text: 'Новый вирус очишающий компьютеры от барахла при открытии документов Word. http://getbootstrap.com'
    },
    {
      date: '22 июнь 2014',
      text: 'Машина получающая топливо из эфира «У такой смеси низкое содержание смол и серы, это обеспечивает чистоту топливной системы автомобиля. Топливо на испытаниях показало совместимость с обычным автомобильным двигателем без модификаций» http://getbootstrap.com'
    }
  ];

  tweetsBase.forEach(function(tweet) {
    createTweet(tweet.date, tweet.text);
  });

  $('#postNewTweet').on('submit', function(event) {
    event.preventDefault();

    var tweetText = $('#tweetText').val();
    createTweet(getDate(), tweetText);
    $('#tweetText').val('');
  });

});

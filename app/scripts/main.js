(function(window){
  var postsData,
      totalSet = 0,
      postsPerSet = 10,
      currentSetIndex = 1,
      postPreviewContainer,
      pagination;

  function init(data){
    postsData = data.posts;
    totalSet =  Math.ceil(postsData.length/10);
    postPreviewContainer = document.getElementById('post-preview-container');
    pagination = document.getElementById('pagination');
    pagination.innerText = currentSetIndex + ' of ' + totalSet;
    document.getElementById('btn-next').addEventListener('click', gotoSet, false);
    document.getElementById('btn-prev').addEventListener('click', gotoSet, false);
    console.log(totalSet);
    generateList(getPostsDataSet(currentSetIndex));
  }
  function generateList(data){
    postPreviewContainer.innerHTML = "";
    data.forEach(function(post){
      var content = '';
      content += '<article class="post-preview">';
      content += '<h1>' + post.title+ '</h1>';
      /*content += '<div class="thumb">';
      content += '<img src="' + getThumbnailURL(post.attachments) + '">';
      content += '</div>';//end of thumb*/
      content += '<div class="info">By:<a href="' + post.author.URL + '">' +post.author.name +'</a></div>';
      content += '<div class="info">Date: ' + formatDate(post.date) + '</div>';
      content += post.excerpt;
      content += '<a href="' + post.URL +'" class="read-article" target="_blank">Read Article</a>';
      content += '</article>';
      postPreviewContainer.innerHTML += content;
    })
  }

  function getPostsDataSet(setIndex){
    var dataSet,
      start = (setIndex-1)*postsPerSet,
      end = start + postsPerSet;
    dataSet = postsData.slice(start, end)
    return dataSet;
  }

  function gotoSet(event){
    switch (event.target.id){
      case 'btn-prev':
        currentSetIndex = (currentSetIndex > 1) ? currentSetIndex - 1 : totalSet;
        break;
      case 'btn-next':
        currentSetIndex = (currentSetIndex < totalSet) ? currentSetIndex + 1 : 1;
        break;
    }
    pagination.innerText = currentSetIndex + ' of ' + totalSet;
    generateList(getPostsDataSet(currentSetIndex));
  }

  function getThumbnailURL(attachments){
    var url = '';
    for(var key in attachments) {
      if(attachments[key].URL){
        url = attachments[key].URL;
        break;
      }
    }
    return url;
  }
  function formatDate(date) {

    var dateData = date.split("-"),
      year = dateData[0],
      month = dateData[1],
      day = dateData[2].slice(0,2),
      months = {
        "01": "Jan",
        "02": "Feb",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
      };
    return months[month] + ' ' + day + ', ' + year;
  }

  Services.getJSONP('https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts?',
    {
      onSuccess: init,
      onTimeout: function(){
        console.log('timeout!');
      },
      timeout: 10
    });
})(window);
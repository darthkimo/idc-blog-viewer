(function(window){
  var postsData,
      totalSet = 0,
      postsPerSet = 10,
      currentSetIndex = 1,
      postPreviewContainer,
      pagination,
      hasSetInQueryString = Services.getQueryString('set');

  function init(data){
    postsData = data.posts;
    totalSet =  Math.ceil(postsData.length/10);
    postPreviewContainer = document.getElementById('post-preview-container');
    pagination = document.getElementById('pagination');

    document.getElementById('btn-next').addEventListener('click', gotoSet, false);
    document.getElementById('btn-prev').addEventListener('click', gotoSet, false);
    console.log(totalSet);

    if(hasSetInQueryString){
      var newSet = Number(hasSetInQueryString);
      if(newSet<=totalSet){
        currentSetIndex = Number(hasSetInQueryString);
      }else{
        manageSetHistory(currentSetIndex);
      }
    }
    pagination.innerText = currentSetIndex + ' of ' + totalSet;
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
      content += '<div class="info">Date: ' + Services.formatDate(post.date) + '</div>';
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
    manageSetHistory(currentSetIndex);
    generateList(getPostsDataSet(currentSetIndex));
  }

  function manageSetHistory(setNum){
    if (history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?set='+setNum;
      window.history.pushState({path:newurl},'',newurl);
    }
  }
  /*function getThumbnailURL(attachments){
    var url = '';
    for(var key in attachments) {
      if(attachments[key].URL){
        url = attachments[key].URL;
        break;
      }
    }
    return url;
  }*/


  Services.getJSONP('https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts?',
    {
      onSuccess: init,
      onTimeout: function(){
        console.log('timeout!');
      },
      timeout: 10
    });
})(window);
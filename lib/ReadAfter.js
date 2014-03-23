(function($){

  ReadAfter =  function(el, settings){
      var  obj = this,
      $el = $(el);

      $.extend(obj, {

        articleContainer: 'read-after',
        dataLnk: 'read-after-link',
        dataTxt: 'read-after-text',
        linkList: [],
        afterList: 'read-after-list',
        btnClass: 'read-after-link',
        clickedMsg: '<span>&#x2713;</span>',

        init: function(){
          var linkRef = settings.links;
          this.articleLinks = $el.find(linkRef);
          this.articleLinks.each($.proxy(this, 'buildLinkOption'));

        },

        buildLinkOption: function(idx, e){
          var $lnk = $(e),
          $saveLink =  $('<span data-' + this.dataTxt + '="' + $lnk.text() + '" data-' + this.dataLnk + '="' + $lnk.attr('href') + '" class="' + this.btnClass + '">' + settings.readAfterText + '</span>');
          $saveLink.insertAfter($lnk);
          $saveLink.on('click', $.proxy(this, 'delegateClick'));

        },

        delegateClick: function(e){
          var $lnk = $(e.currentTarget),
              url = $lnk.data(this.dataLnk),
              txt = $lnk.data(this.dataTxt),
              hash = false;
              if(url.charAt(0) === '#'){
                hash = true;
              }
              var readLnk = this.createLink(url,txt, hash);

          this.addLinkList(readLnk);
          this.removeLink($lnk);

        },

        removeLink: function($lnk){
          $lnk.off('click').addClass(settings.disabledClass).append(this.clickedMsg);
        },

        createLink: function(url,txt, hash){
          var newWin = '';
          if(settings.newWindow && !hash) { newWin = 'target="_blank" '; }
          return '<a href="' + url + '" ' + newWin + '>' + txt + '</a>';
        },

        addLinkList: function(lnk){
          if($el.find('.' + this.afterList).length < 1){
            this.onBeforeBuildList();
            this.buildLinkList(lnk);
          }else{
            this.$list.find('div').append(', ' + lnk);
            this.onAfterLink();
          }
        },
        buildLinkList: function(lnk){
          this.$list = $('<div />', {
            'class': this.afterList,
            html: settings.afterListTitle + '<div>' + lnk + '</div>'
          });
          this.onAfterLink();
          $el.append(this.$list);
          this.$list.hide().fadeIn(settings.fadeSpeed, $.proxy(this, 'onAfterBuildList'));
        },

        onBeforeBuildList: function(){

          if(typeof settings.onBeforeBuildList === 'function'){
            settings.onBeforeBuildList.call(this);
          }
        },

        onAfterBuildList: function(){
          if(typeof settings.onAfterBuildList === 'function'){
            settings.onAfterBuildList.call(this);
          }
        },

        onAfterLink: function(){
          if(typeof settings.onAfterLink  === 'function'){
            settings.onAfterLink.call(this);
          }
        }

      });
      obj.init();
  };

  $.fn.readafter = function(options){
    return this.each(function(){
      var $this = $(this),
      settings = {
        afterListTitle: '',
        readAfterText: 'read after',
        disabledClass: 'disabled',
        links: 'a',
        newWindow: true,
        fadeSpeed: 500,
        onBeforeBuildList: function() {},
        onAfterBuildList: function() {},
        onAfterLink: function() {}
      };
        
      if (options) { 
        $.extend(settings, options);
      }
      // create new instance of the ReadAfter object
      new ReadAfter($this, settings);
    });
  };

})(jQuery); 




(function($){

	ReadAfter =  function(el, settings){
	    var  obj = this,
	         $el = $(el);

	    $.extend(obj, {

        articleContainer: 'read-after',
        dataLnk: 'read-after-link',
        dataTxt: 'read-after-text',
        linkList: [],

        init: function(){
          var linkRef = $el.data(this.articleContainer);
          this.articleLinks = $el.find('[data-' + linkRef + ']');
          this.articleLinks.each($.proxy(this, 'buildLinkOption'));

        },

        buildLinkOption: function(idx, e){
          var $lnk = $(e),
          $saveLink =  $('<span data-' + this.dataTxt + '="' + $lnk.text() + '" data-' + this.dataLnk + '="' + $lnk.attr('href') + '" class="' + settings.btnClass + '">' + settings.readAfterText + '</span>');
          $saveLink.insertAfter($lnk);
          $saveLink.on('click', $.proxy(this, 'delegateClick'));

        },

        delegateClick: function(e){
          var $lnk = $(e.currentTarget)
              url = $lnk.data(this.dataLnk),
              txt = $lnk.data(this.dataTxt),
              readLnk = this.createLink(url,txt);

          this.addLinkList(readLnk);
          this.removeLink($lnk);

        },

        removeLink: function($lnk){
          $lnk.off('click').addClass(settings.disabledClass);
        },

        createLink: function(url,txt){
          return '<a href="' + url + '">' + txt + '</a>';
        },

        addLinkList: function(lnk){
          if($el.find('.' + settings.afterList).length < 1){
            this.buildLinkList(lnk);
          }else{
            this.$list.append(lnk);
          }
        },
        buildLinkList: function(lnk){
          this.$list = $('<div />', {
            'class': settings.afterList,
            html: lnk
          });

          $el.append(this.$list);
        }

	    });
    	obj.init();
	};

	$.fn.readAfter = function(options){
    return this.each(function(){
      var $this = $(this),
      settings = {
      	afterList: 'read-after-list',
      	readAfterText: 'read after',
        btnClass: 'read-after-link',
        disabledClass: 'disabled'
      };
        
      if (options) { 
        $.extend(settings, options);
      }
      // create new instance of the ReadAfter object
      new ReadAfter($this, settings);
    });
  };

})(jQuery);	




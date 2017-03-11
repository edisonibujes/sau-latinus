function changeOrderIcon(){
  $(document).delegate('.desc', 'click', function(){
      $(this).removeClass( "order desc fa fa-sort-alpha-desc" );
      $(this).attr('class', 'order asc fa fa-sort-alpha-asc');
  });

  $(document).delegate('.asc', 'click', function(){
      $(this).removeClass( "order asc fa fa-sort-alpha-asc" );
      $(this).attr('class', 'order desc fa fa-sort-alpha-desc');
  });
};

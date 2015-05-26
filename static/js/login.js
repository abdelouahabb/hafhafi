$(document).ready(function(){
$('#login')
  .form({
      email: {
      identifier  : 'email',
      rules: [
        {
          type   : 'email',
          prompt : 'حط الإيميل تاعك'
        }
      ]
    },
      pass1: {
      identifier  : 'pass1',
      rules: [
        {
            type   : 'empty',
            prompt : 'وين راهي كلمة السر'
        }
      ]
    },
  },
  {inline : true,
  on     : 'blur'}
  )});
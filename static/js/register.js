$(document).ready(function(){
$('#register')
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
            type   : 'length[6]',
            prompt : 'كلمة السر لازم على الأقل فيها 6 '
        }
      ]
    },
          pass2: {
      identifier  : 'pass2',
      rules: [
        {
          type   : 'match[pass1]',
          prompt : 'عاود اكتبها'
        },
        {
            type   : 'empty',
            prompt : 'كلمة السر لازم على الأقل فيها 6 '
          }
      ]
    }
  },
  {inline : true,
  on     : 'blur'}
  )});
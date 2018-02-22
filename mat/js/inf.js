document.addEventListener('DOMContentLoaded', function() {
  $('[data-toggle="popover"]').popover()

  if (!('first' in localStorage)) {
    $('#popoverInfo').modal()
    localStorage.first = null
  }

  for (i=0; i < $('[class~="CodeMirror"]').length; i++) {
    $('[class~="CodeMirror"]')[i].ondblclick = function(){
      $('[class~="CodeMirror"]').css('height','100px !important')
    }
  }

  last10 = null
  last2 = null
})

document.getElementById('2to10').onclick = function() {
  try {
    if (!!$('#2to10_10')[0].value || !!$('#2to10_2')[0].value) {
      if (!!$('#2to10_10')[0].value && $('#2to10_10')[0].value-'0' !== last10) {
        $('#2to10_2')[0].value = trans10to2($('#2to10_10')[0].value)
      } else if (!!$('#2to10_2')[0].value && $('#2to10_2')[0].value-'0' !== last2) {
        $('#2to10_10')[0].value = trans2to10($('#2to10_2')[0].value)
      }
    }
    last10 = $('#2to10_10')[0].value - '0'
    last2 = $('#2to10_2')[0].value - '0'
  } catch (e) {
    throw e
  }
}

function trans10to2(num) {
  if (num == 0)
    return 0

  res = ''
  while (num > 1) {
    res += num%2
    num = Math.floor(num/2)
  }
  return Array.from(res+'1').reverse().join('')-'0'
}

function trans2to10(num) {
  return Array.from(Array((num+[]).length).keys()).map( function(x){ return Array.from(num+[]).reverse()[x]*(2**x) } ).reduce( function(a,b){return a+b}, 0)
}
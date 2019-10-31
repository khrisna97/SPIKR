export default  [
  {
    placeholder:'Username atau email',
    name:'credential',
    size:'sm',
    col:6,
    validators:'required'
  },
  {
    placeholder:'Password',
    name:'password',
    type:'password',
    size:'sm',
    validators:'required|alpha_num|min:6',
    col:6,
  }
]
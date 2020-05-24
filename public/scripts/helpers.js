function show(element) {
  element.removeClass('is-hidden');
}

function hide(element) {
  element.addClass('is-hidden');
}

export default { show, hide };

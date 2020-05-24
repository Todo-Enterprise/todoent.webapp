import helpers from './helpers';

const { show, hide } = helpers;

function Note($container) {
  const that = this;

  this.$container = $container;
  this.id = $container.data('id');
  if (this.id === undefined) {
    this.id = '';
  }

  this.show = () => {
    $container.addClass('is-opened');
  };

  this.hide = () => {
    if (that.isNoteEmpty()) {
      $container.remove();
      return;
    }

    $container.removeClass('is-opened');
  };

  this.isOpened = () => $container.hasClass('is-opened');

  this.getNoteTitle = () => {
    const $noteTitle = $container.find('.card-header input');
    return ($noteTitle.val() || '').trim();
  };

  this.getNoteContent = () => {
    const $noteContent = $container.find('.card-content textarea');
    return ($noteContent.val() || '').trim();
  };

  this.isNoteEmpty = () => {
    const title = that.getNoteTitle();
    const content = that.getNoteContent();

    return (title === '' && content === '');
  };

  this.focusTitle = () => {
    $container.find('.card-header input').focus();
  };

  this.save = () => {
    $container.removeClass('is-opened');

    if (that.isNoteEmpty()) return;

    const title = that.getNoteTitle();
    const content = that.getNoteContent();
    if (title === $container.data('title') && content === $container.data('content')) return;

    that.block();
    that.hide();
    const saveRequest = (that.id !== '')
      ? that.sendUpdatedNoteData(title, content)
      : that.sendAsNewNoteData(title, content);

    saveRequest
      .then((response) => response.json())
      .then((body) => {
        if (that.id === undefined) {
          that.id = body.id;
          $container.data('id', that.id);
        }

        $container.data('title', title);
        $container.data('content', content);
        $container.removeClass('js-is-transient');
        that.unblock();
      });
  };

  this.complete = () => {
    const opts = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isDone: true,
      }),
    };

    fetch(`/notes/${that.$container.data('id')}`, opts)
      .then((response) => response.json())
      .then((body) => {
        $container.addClass('is-done');
      });
  };

  this.block = () => {
    $container.find('input, textarea').attr('readonly', true);
    $container.find('.save-btn, .delete-btn').attr('disabled', true);
    hide($container.find('.note-dropdown'));
    show($container.find('.loader'));
  };

  this.unblock = () => {
    $container.find('input, textarea').attr('readonly', false);
    $container.find('.save-btn, .delete-btn').attr('disabled', false);
    hide($container.find('.loader'));
    show($container.find('.note-dropdown'));
  };

  this.sendUpdatedNoteData = (title, content) => {
    const opts = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    };
    return fetch(`/notes/${that.id}`, opts);
  };

  this.sendAsNewNoteData = (title, content) => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    };

    return fetch('/notes', opts);
  };
}

export default Note;

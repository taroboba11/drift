//sending email 4 contact
function sendEmail(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;
  const subject = form.subject.value;

  const body = encodeURIComponent(
    `${message}`
  );

  const mailtoLink = `mailto:tarabalaji11@gmail.com?subject=${subject}&body=${body}`;

  window.open(mailtoLink, '_blank');
}

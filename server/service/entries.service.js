const { Entry } = require('../db/models');

async function initEntries(id) {
  const entries = await Entry.findAll({
    where: { user_id: id },
  });

  return entries;
}

async function updateEntry(entryId, newTitle, newImg) {
  const entries = await Entry.update(
    { title: newTitle, img: newImg },
    { where: { id: entryId } },
  );
  return entries;
}

async function newEntry(userId, title, img) {
  const imgPath = `/img/${img.name}`;
  img.mv(`public/img/${img.name}`, (err) => {
    if (err) { console.log(err); }
  });
  const entries = await Entry.create({ title, user_id: userId, img: imgPath });
  return entries;
}

async function removEntry(entryId) {
  const entries = await Entry.destroy({ where: { id: entryId } });
  return entries;
}
module.exports = {
  initEntries, newEntry, updateEntry, removEntry,
};

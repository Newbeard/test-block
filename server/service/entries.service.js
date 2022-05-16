const { Entry } = require('../db/models');
const { deleteFile, saveFile } = require('../helpers/fs');

async function initEntries(id) {
  const entries = await Entry.findAll({
    where: { user_id: id },
  });

  return entries;
}

async function updateEntry(entryId, newTitle, newImg) {
  const imgPath = `/${newImg.name}`;
  saveFile(newImg);
  const { img } = await Entry.findOne({
    attributes: ['img'],
    raw: true,
    where: { id: entryId },
  });
  await deleteFile(img);
  const entries = await Entry.update(
    { title: newTitle, img: imgPath },
    { where: { id: entryId } },
  );
  return entries;
}

async function newEntry(userId, title, img) {
  const imgPath = `/${img.name}`;
  saveFile(img);
  const entries = await Entry.create({ title, user_id: userId, img: imgPath });
  return entries;
}

async function removEntry(entryId) {
  const { img } = await Entry.findOne({
    attributes: ['img'],
    raw: true,
    where: { id: entryId },
  });
  await deleteFile(img);
  const entries = await Entry.destroy({ where: { id: entryId } });
  return entries;
}
module.exports = {
  initEntries, newEntry, updateEntry, removEntry,
};

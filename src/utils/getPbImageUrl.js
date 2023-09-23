const getPbImageURL = (item, fileName = 'photo') =>
  `${import.meta.env.VITE_PB_URL}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`

export default getPbImageURL;
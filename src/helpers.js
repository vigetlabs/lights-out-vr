import config from './config'

export const createTextureMatrix = (size = 5) => {
  let mat = []

  while (mat.length < size) {
    const row = []

    while (row.length < size) {
      row.push(
        config.TEXTURES[Math.floor(Math.random() * config.TEXTURES.length)]
      )
    }

    mat.push(row)
  }

  return mat
}

/**
 * createRandomMatrix: Creates a random matrix of 0s or 1s
 * @param {Int} size - The size of the matrix, 5 by default
 * @param {String} mode - The difficulty mode, EASY by default
 * @return {Array<Array>} - 2D array which represents the Lights Out matrix
 */
export const createRandomMatrix = (size = 5, mode) => {
  let mat = []

  if (mode === 'EASY') {
    mat = [
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 0, 1, 1]
    ]
  } else {
    while (mat.length < size) {
      const row = []

      while (row.length < size) {
        row.push(Math.round(Math.random()))
      }

      mat.push(row)
    }
  }

  return mat
}

/**
 * computeNewMatrix: Computes the new matrix given an old matrix and the toggled point
 * @param {Array<Array>} mat - The matrix in which we will run the Lights Out algorithm
 * @param {Object} point - The matrix in which we will run the Lights Out algorithm
 * @return {Array<Array>} - The new matrix with updated toggles
 */
export const computeNewMatrix = (mat, point) => {
  const { x, y } = point
  let newMat = mat.splice(0)

  // Toggle the clicked tile
  newMat[y][x] = !newMat[y][x] | 0

  // Toggle neighbors
  if (y !== 0) newMat[y - 1][x] = !newMat[y - 1][x] | 0
  if (y !== newMat[x].length - 1) newMat[y + 1][x] = !newMat[y + 1][x] | 0
  if (x !== 0) newMat[y][x - 1] = !newMat[y][x - 1] | 0
  if (x !== newMat.length - 1) newMat[y][x + 1] = !newMat[y][x + 1] | 0

  return newMat
}

/**
 * verifyCompletion: Verifies whether the game has been won or not
 * @param {Array<Array>} mat - The matrix which will be verified
 * @return {Bool} - Whether the matrix has all lights turned off (0s)
 */
export const verifyCompletion = mat => {
  // If there's a 0 at any point, the game is not complete
  for (let row of mat) {
    for (let element of row) {
      if (element === 1) {
        return false
      }
    }
  }

  return true
}

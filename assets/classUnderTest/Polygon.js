/**
 * Class representing a Polygon.
 */
export default class Polygon {
  /**
   * Create a polygon.
   */
  constructor() {
    this.vertices = [];
  }

  /**
   * Add a vertex to the polygon.
   * @param {Object} vertex - The vertex to add.
   * @throws {Error} If the vertex is not an object with numeric x and y properties.
   */
  addVertex(vertex) {
    if (typeof vertex.x !== "number" || typeof vertex.y !== "number") {
      throw new Error(
        "Vertex must be an object with numeric x and y properties"
      );
    }

    this.vertices.push(vertex);
  }

  /**
   * Remove a vertex from the polygon by its index.
   * @param {number} index - The index of the vertex to remove.
   * @throws {Error} If the index is out of bounds.
   */
  removeVertex(index) {
    if (index < 0 || index >= this.vertices.length) {
      throw new Error("Index out of bounds");
    }

    this.vertices.splice(index, 1);
  }

  /**
   * Calculate the perimeter of the polygon.
   * @returns {number} The calculated perimeter.
   */
  calculatePerimeter() {
    let perimeter = 0;

    for (let i = 0; i < this.vertices.length; i++) {
      const v1 = this.vertices[i];
      const v2 = this.vertices[(i + 1) % this.vertices.length];

      const dx = v2.x - v1.x;
      const dy = v2.y - v1.y;

      perimeter += Math.sqrt(dx * dx + dy * dy);
    }

    return perimeter;
  }

  /**
   * Calculate the area of the polygon.
   * @returns {number} The calculated area.
   */
  calculateArea() {
    if (this.vertices.length < 3) {
      throw new Error(
        "Cannot calculate area of a polygon with less than three vertices"
      );
    }

    let area = 0;

    for (let i = 0; i < this.vertices.length; i++) {
      const v1 = this.vertices[i];
      const v2 = this.vertices[(i + 1) % this.vertices.length];

      area += v1.x * v2.y - v2.x * v1.y;
    }

    return Math.abs(area) / 2;
  }

  /**
   * Check if a point is inside the polygon.
   * @param {Object} point - The point to check.
   * @returns {boolean} True if the point is inside the polygon, false otherwise.
   */
  isPointInside(point) {
    // This is a simple implementation based on ray casting algorithm and it assumes that the polygon is simple and convex
    let inside = false;

    for (
      let i = 0, j = this.vertices.length - 1;
      i < this.vertices.length;
      j = i++
    ) {
      const xi = this.vertices[i].x,
        yi = this.vertices[i].y;
      const xj = this.vertices[j].x,
        yj = this.vertices[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  }

  /**
   * Translate the polygon by a vector.
   * @param {Object} vector - The vector to translate the polygon.
   * @throws {Error} If the vector is not an object with numeric x and y properties.
   */
  translate(vector) {
    if (typeof vector.x !== "number" || typeof vector.y !== "number") {
      throw new Error(
        "Vector must be an object with numeric x and y properties"
      );
    }

    for (let vertex of this.vertices) {
      vertex.x -= vector.x;
      vertex.y -= vector.y;
    }
  }

  /**
   * Scale the polygon by a factor.
   * @param {number} factor - The scale factor.
   * @throws {Error} If the scale factor is not a number.
   */
  scale(factor) {
    if (typeof factor !== "number") {
      throw new Error("Scale factor must be a number");
    }

    for (let vertex of this.vertices) {
      vertex.x *= factor;
      vertex.y *= factor;
    }
  }

  /**
   * Rotate the polygon by an angle.
   * @param {number} angle - The rotation angle.
   * @throws {Error} If the rotation angle is not a number.
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    for (let vertex of this.vertices) {
      const x = vertex.x * cos - vertex.y * sin;
      const y = vertex.x * sin + vertex.y * cos;

      vertex.x = x;
      vertex.y = y;
    }
  }
}

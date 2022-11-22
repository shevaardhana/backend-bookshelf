module.exports = (sequelize, DataType) => {
    const Books = sequelize.define(
        "Books",
        {
            id: {
                type: DataType.UUID,
                defaultValue: DataType.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: { type: DataType.STRING },
            year: { type: DataType.INTEGER },
            author: { type: DataType.STRING },
            summary: { type: DataType.STRING },
            publisher: { type: DataType.STRING },
            pageCount: { type: DataType.INTEGER },
            readPage : { type: DataType.INTEGER },
            finished : { type: DataType.BOOLEAN },
            reading : { type: DataType.BOOLEAN },
        },
        {
            tableName: "books"
        }
    )

    return Books
}
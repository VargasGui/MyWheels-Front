export default class Car{
    constructor(number, image, name, displayName, collectionId, batchId, description, acquisitionDate, isThunt, isSuperThunt){
        this.number = Number(number);
        this.imageUrl = image;
        this.name = name;
        this.displayName = displayName;
        this.collectionId = Number(collectionId);
        this.batchId = Number(batchId);
        this.description = description;
        this.acquisitionDate = acquisitionDate;
        this.isThunt = isThunt === 'true' ? true : false;
        this.isSuperThunt = isSuperThunt === 'true' ? true : false;
    }
  
}
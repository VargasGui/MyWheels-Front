export default class Car{
    constructor(image, name, collectionId, batchId, description, acquisitionDate, isThunt, isSuperThunt){
        this.image = image;
        this.name = name;
        this.collectionId = Number(collectionId);
        this.batchId = Number(batchId);
        this.description = description;
        this.acquisitionDate = acquisitionDate;
        this.isThunt = isThunt === 'true' ? true : false;
        this.isSuperThunt = isSuperThunt === 'true' ? true : false;
    }
  
}
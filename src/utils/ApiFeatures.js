export class ApiFeatures{
    constructor(mongooseQuery , searchQuery){
        this.mongooseQuery=mongooseQuery;
        this.searchQuery=searchQuery
    }
    pagination(){
        if( this.searchQuery.page <=0) this.searchQuery.page =1 ; 
        let pageNumber = this.searchQuery.page * 1|| 1
        let pagelimit = 20
        let skip = (pageNumber - 1) * pagelimit
        this.pageNumber = pageNumber
        this.mongooseQuery.skip(skip).limit(pagelimit);
        return this;
    
     }
    
     filter(){
        let filterObj = {... this.searchQuery}
        let excludefiled = ['page','keyword','fileds','keyword']
        excludefiled.forEach(val=>{
            delete filterObj[val]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g ,match => "$" + match )
        filterObj = JSON.parse(filterObj);
        this.mongooseQuery.find(filterObj);
        return this;
    
     }
    
    sort(){
           
    if(this.searchQuery.sort){
        let sortBy = this.searchQuery.sort.split(',').join(' ')
        console.log(sortBy);
       this.mongooseQuery.sort(sortBy)
    }
    return this;
    }
    
    
    fields(){
        if(this.searchQuery.fields){
            let fields = this.searchQuery.fields.split( ',').join( ' ' );
            console.log(fields)
            this.mongooseQuery.select(fields)
    
    }
    return this;
    }
    
    search(){
        if(this.searchQuery.keyword){
            this.mongooseQuery.find({title:{ $regex : this.searchQuery.keyword}})
    
    }
    return this;
    }
    
    
    
    
    
    
    
    
    
    
}
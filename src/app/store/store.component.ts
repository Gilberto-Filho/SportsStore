
import { Component } from "@angular/core";
import { Product }  from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
 
@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
 
export class StoreComponent {
    
    public selectedCategory = null;
 
    public productsPerPag = 4;
    public selectedPag = 1;
 
    public palavraChave = "";
 
    constructor(private repository: ProductRepository) { }
 
    get products(): Product[] {
        let pagIndex = (this.selectedPag - 1) * this.productsPerPag;
        return this.repository.getProducts(this.selectedCategory)
            .slice(pagIndex, pagIndex + this.productsPerPag);
    } 
 
    get produtos(): Product[] {
        return this.repository.getProducts(this.selectedCategory);
    }
 
    get categories(): string[] {
        return this.repository.getCategories();
    }
 
    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
    }
 
    changePag(newPag: number){
        this.selectedPag = newPag;
    }
 
    changePagSize(newSize: number){
        this.productsPerPag = Number(newSize);
        this.changePag(1);
    }
 
    get pagNumbers(): number[] {
        return Array(Math.ceil(this.repository
            .getProducts(this.selectedCategory).length / this.productsPerPag))
                .fill(0).map((x, i) => i + 1);
    }
 
}

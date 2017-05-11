import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent }  from './product-list.component';
import { ProductDetailComponent }  from './product-detail.component';
import { ProductSearchFilterPipe } from './product-search-filter.pipe';
import { ProductCategoryFilterPipe } from './product-category-filter.pipe';
import { ProductFormatFilterPipe } from './product-format-filter.pipe';
import { ProductService } from './product.service'
import { ProductDetailGuard } from './product-guard.service'

@NgModule({
	declarations: [
		ProductListComponent,
		ProductDetailComponent,
		ProductSearchFilterPipe,
		ProductFormatFilterPipe,
		ProductCategoryFilterPipe
	],
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: 'products', component: ProductListComponent },
        	{ path: 'product/:id', canActivate: [ ProductDetailGuard ], component: ProductDetailComponent },
		])
	],
	providers: [
		ProductService,
		ProductDetailGuard
	]
})

export class ProductModule {}
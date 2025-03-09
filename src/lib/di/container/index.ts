import { Container } from "inversify"

import { configureCatalogBindings } from "@/lib/di/container/catalogContainer"
import { configureCategoryBindings } from "@/lib/di/container/categoryContainer"

export function configureContainer() {
    const container = new Container()

    configureCatalogBindings(container)
    configureCategoryBindings(container)

    return container
}

export const container = configureContainer()

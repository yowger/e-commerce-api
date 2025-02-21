import { Container } from "inversify"

import { configureCatalogBindings } from "@/shared/di/container/catalogContainer"
import { configureSharedBindings } from "@/shared/di/container/sharedContainers"

export function configureContainer() {
    const container = new Container()

    configureCatalogBindings(container)
    configureSharedBindings(container)

    return container
}

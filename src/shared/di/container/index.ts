import { Container } from "inversify"

import { configureCatalogBindings } from "@/shared/di/container/catalogContainer"

export function configureContainer() {
    const container = new Container()

    configureCatalogBindings(container)

    return container
}

export const container = configureContainer()

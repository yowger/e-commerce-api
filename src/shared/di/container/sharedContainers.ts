import { Container } from "inversify"

import App from "@/shared/App/App"
import { SwaggerService } from "@/shared/swagger/SwaggerService"

export function configureSharedBindings(container: Container) {
    container.bind(App).toSelf()
    container.bind(SwaggerService).toSelf()
}

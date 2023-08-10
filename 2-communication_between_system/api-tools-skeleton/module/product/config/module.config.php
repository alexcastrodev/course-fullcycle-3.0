<?php
return [
    'service_manager' => [
        'factories' => [
            \product\V1\Rest\Products\ProductsResource::class => \product\V1\Rest\Products\ProductsResourceFactory::class,
        ],
    ],
    'router' => [
        'routes' => [
            'product.rest.products' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/products[/:products_id]',
                    'defaults' => [
                        'controller' => 'product\\V1\\Rest\\Products\\Controller',
                    ],
                ],
            ],
        ],
    ],
    'api-tools-versioning' => [
        'uri' => [
            1 => 'product.rest.products',
        ],
    ],
    'api-tools-rest' => [
        'product\\V1\\Rest\\Products\\Controller' => [
            'listener' => \product\V1\Rest\Products\ProductsResource::class,
            'route_name' => 'product.rest.products',
            'route_identifier_name' => 'products_id',
            'collection_name' => 'products',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \product\V1\Rest\Products\ProductsEntity::class,
            'collection_class' => \product\V1\Rest\Products\ProductsCollection::class,
            'service_name' => 'products',
        ],
    ],
    'api-tools-content-negotiation' => [
        'controllers' => [
            'product\\V1\\Rest\\Products\\Controller' => 'HalJson',
        ],
        'accept_whitelist' => [
            'product\\V1\\Rest\\Products\\Controller' => [
                0 => 'application/vnd.product.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
        ],
        'content_type_whitelist' => [
            'product\\V1\\Rest\\Products\\Controller' => [
                0 => 'application/vnd.product.v1+json',
                1 => 'application/json',
            ],
        ],
    ],
    'api-tools-hal' => [
        'metadata_map' => [
            \product\V1\Rest\Products\ProductsEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'product.rest.products',
                'route_identifier_name' => 'products_id',
                'hydrator' => \Laminas\Hydrator\ArraySerializable::class,
            ],
            \product\V1\Rest\Products\ProductsCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'product.rest.products',
                'route_identifier_name' => 'products_id',
                'is_collection' => true,
            ],
        ],
    ],
];

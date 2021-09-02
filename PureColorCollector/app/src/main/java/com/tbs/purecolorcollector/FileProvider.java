package com.tbs.purecolorcollector;

import java.security.Provider;

/**
 * author jingting
 * date : 2021/8/26上午11:47
 */
public class FileProvider extends Provider {
    /**
     * Constructs a provider with the specified name, version number,
     * and information.
     *
     * @param name    the provider name.
     * @param version the provider version number.
     * @param info    a description of the provider and its services.
     */
    protected FileProvider(String name, double version, String info) {
        super(name, version, info);
    }
}
